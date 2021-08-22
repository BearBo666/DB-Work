package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type PioneerDaoManage struct {
}

var PioneerDao PioneerDaoManage

// 根据前人id查找前人
func (u *PioneerDaoManage) FindOne(ids []int) (pioneer []Pioneer, err error) {
	err = OpenDataBase()
	if err != nil {
		return
	}
	defer CloseDataBase()

	err = GDB.Preload("User").Preload("Topics").Find(&pioneer, ids).Error

	return
}

// 创建一个前人
func (u *PioneerDaoManage) Create(userId int, name, title, email, introduce, avatar, freeTime string, topics []Topic) (pioneer *Pioneer, err error) {
	err = OpenDataBase()
	if err != nil {
		return
	}

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
	// fmt.Println(pioneerTopics)
	err = tx.Create(&pioneerTopics).Error
	if err != nil {
		tx.Rollback()
		return
	}

	tx.Commit()
	return
}
