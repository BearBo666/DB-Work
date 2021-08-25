package models

import "time"

type Admin struct {
	AdminId       int       `gorm:"size:11;column:adminId" json:"adminId"`
	Name          string    `gorm:"size:255;column:name"   json:"name"`
	Password      string    `gorm:"size:255;column:password" json:"password"`
	Email         string    `gorm:"size:50;column:email" json:"email"`
	LastLoginIp   string    `gorm:"size:25;column:lastLoginIp" json:"lastLoginIp"`
	LastLoginTime time.Time `gorm:"column:lastLoginTime" json:"lastLoginTime"`
}

func (*Admin) TableName() string {
	return "admin"
}
