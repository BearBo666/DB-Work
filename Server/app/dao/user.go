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
	err = GDB.Where(&User{UserName: userName, Password: password}).First(&user).Error

	return
}

// 创建一个用户
func (u *UserDaoManage) Create(userName, password string) (user *User, err error) {
	user = &User{UserName: userName, Password: password}

	err = GDB.Create(user).Error

	return
}
