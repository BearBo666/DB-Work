package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type PioneerDaoManage struct {
}

var PioneerDao PioneerDaoManage

// 根据前人id数组查找前人
func (u *PioneerDaoManage) FindByIds(ids []int, currentPage, pageNum int) (pioneerList []Pioneer, err error) {

	if len(ids) > 0 {
		err = GDB.
			Preload("Topics").
			Find(&pioneerList, ids).Error
	} else {
		err = GDB.
			Model(&Pioneer{}).
			Preload("Topics").
			Order("createdAt DESC").
			Limit(pageNum).Offset((currentPage - 1) * pageNum).
			Find(&pioneerList).Error
	}

	return
}

// 分页查找前人
func (u *PioneerDaoManage) FindAll(currentPage, pageNum int) (pioneerList []Pioneer, err error) {
	err = GDB.
		Model(&Pioneer{}).
		Preload("Topics").
		Order("createdAt DESC").
		Limit(pageNum).Offset((currentPage - 1) * pageNum).
		Find(&pioneerList).Error
	return
}

// 创建一个前人
func (u *PioneerDaoManage) Create(userId int, categoryId []int, name, title, email, introduce, avatar, freeTime string, topics []Topic) (pioneer *Pioneer, err error) {

	// 开启事务
	tx := GDB.Begin()

	pioneer = &Pioneer{UserId: userId, Name: name, Title: title, Email: email, Introduce: introduce, Avatar: "logo.png", FreeTime: freeTime}
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
	for _, cate := range categoryId {
		pioneerCate := &PioneerCate{CategoryId: cate, PioneerId: pioneer.PioneerId}
		err = tx.Create(pioneerCate).Error
		if err != nil {
			tx.Rollback()
			return
		}
	}

	tx.Commit()
	return
}

// 根据用户id查找前人
func (u *PioneerDaoManage) FindByUserId(userId int) (pioneer *Pioneer, err error) {
	pioneer = &Pioneer{UserId: userId}
	err = GDB.First(pioneer).Error
	if err != nil {
		return nil, err
	}
	return
}

// 更新头像
func (u *PioneerDaoManage) Update(pioneerId int, avater string) (err error) {
	err = GDB.Model(&Pioneer{}).Where("PioneerId", pioneerId).Update("avatar", avater).Error

	return
}
