package models

import "time"

// 用户
type User struct {
	UserId    int       `gorm:"primary_key;column:userId"`
	UserName  string    `gorm:"size:255;column:userName"`
	Password  string    `gorm:"size:255;column:password"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}

func (*User) TableName() string {
	return "user"
}
