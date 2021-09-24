package models

import "time"

// 用户
type User struct {
	UserId    int       `gorm:"size:11;primary_key;column:userId" json:"userId"`
	UserName  string    `gorm:"size:255;column:userName" json:"userName"`
	Password  string    `gorm:"size:255;column:password" json:"-"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
}

func (*User) TableName() string {
	return "user"
}
