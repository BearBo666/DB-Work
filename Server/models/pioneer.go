package models

import (
	"time"
)

// 前人
type Pioneer struct {
	PioneerId int       `gorm:"primary_key;size:11;column:pioneerId" json:"pioneerId"`
	Name      string    `gorm:"size:255;column:name" json:"name"`
	Title     string    `gorm:"size:255;column:title" json:"title"`
	Email     string    `gorm:"size:50;column:email" json:"email"`
	Introduce string    `gorm:"size:255;column:introduce" json:"introduce"`
	Avatar    string    `gorm:"size:255;column:avatar" json:"avatar"`
	FreeTime  string    `gorm:"size:255;column:freeTime" json:"freeTime"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:createdAt" json:"-"`
	// 关联
	UserId int            `gorm:"size:11;column:userId;" json:"-"`
	User   User           `gorm:"foreignKey:UserId" json:"-"`
	Topics []PioneerTopic `gorm:"foreignKey:PioneerId;references:PioneerId" json:"topics"`
}

func (*Pioneer) TableName() string {
	return "pioneer"
}
