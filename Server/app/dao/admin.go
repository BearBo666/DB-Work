package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
	"time"
)

type IAdminDao struct{}

var AdminDao IAdminDao

// 找到一个管理员
func (dao *IAdminDao) FindOne(name, password string) (admin *Admin, err error) {
	admin = &Admin{Name: name, Password: password}
	err = GDB.First(admin).Error

	if err != nil {
		return nil, err
	}
	return
}

// 管理员列表
func (dao *IAdminDao) FindAll(currentPage, pageNum int) (admins []Admin, err error) {
	err = GDB.Limit(pageNum).Offset((currentPage - 1) * pageNum).Find(&admins).Error
	if err != nil {
		return nil, err
	}
	return
}

// 创建一个管理员
func (dao *IAdminDao) Create(name, password string) (err error) {
	return GDB.Create(&Admin{Name: name, Password: password}).Error
}

// 更新一个管理员的登录ip和时间
func (dao *IAdminDao) Update(adminId int, ip string) (err error) {
	return GDB.Model(&Admin{AdminId: adminId}).Updates(Admin{LastLoginIp: ip, LastLoginTime: time.Now()}).Error
}
