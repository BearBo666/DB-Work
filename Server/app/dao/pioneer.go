package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type PioneerDaoManage struct {
}

var PioneerDao PioneerDaoManage

// 根据前人id查找前人
func (u *PioneerDaoManage) FindById(ids []int) (pioneer []Pioneer, err error) {

	err = GDB.Preload("Topics").Find(&pioneer, ids).Error

	return
}

// 创建一个前人
func (u *PioneerDaoManage) Create(userId, categoryId int, name, title, email, introduce, avatar, freeTime string, topics []Topic) (pioneer *Pioneer, err error) {

	// 开启事务
	tx := GDB.Begin()

	pioneer = &Pioneer{UserId: userId, Name: name, Title: title, Email: email, Introduce: introduce, Avatar: avatar, FreeTime: freeTime}
	// 创建前人记录
	err = tx.Create(pioneer).Error
	if err != nil {
		tx.Rollback()
		return
	}

	// 创建前人擅长的话题
	var pioneerTopics []PioneerTopic
	// 遍历传入的话题
	for i := 0; i < len(topics); i++ {
		topic := topics[i]
		pt := PioneerTopic{PioneerId: pioneer.PioneerId, Title: topic.Title, Content: topic.Content}
		pioneerTopics = append(pioneerTopics, pt)
	}
	err = tx.Create(&pioneerTopics).Error
	if err != nil {
		tx.Rollback()
		return
	}

	// 创建前人所对应的领域
	pioneerCate := &PioneerCate{CategoryId: categoryId, PioneerId: pioneer.PioneerId}
	err = tx.Create(pioneerCate).Error
	if err != nil {
		tx.Rollback()
		return
	}

	tx.Commit()
	return
}
