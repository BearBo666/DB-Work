package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type UserDaoManage struct {
}

var UserDao UserDaoManage

// 根据用户名密码查询用户
func (u *UserDaoManage) FindOne(userName, password string) (user User, err error) {
	err = GDB.
		Where(&User{UserName: userName, Password: password}).
		First(&user).Error

	return
}

// 创建一个用户
func (u *UserDaoManage) Create(userName, password string) (user *User, err error) {
	user = &User{UserName: userName, Password: password}

	if err = GDB.Create(user).Error; err != nil {
		return nil, err
	}

	return
}

// 用户列表
func (u *UserDaoManage) FindAll(currentPage, pageNum int) (users []User, err error) {
	err = GDB.
		Limit(pageNum).Offset((currentPage - 1) * pageNum).
		Find(&users).Error
	if err != nil {
		return nil, err
	}
	return
}
