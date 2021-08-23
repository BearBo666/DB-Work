package models

import (
	"time"
)

// 前人
type Pioneer struct {
	PioneerId int       `gorm:"primary_key;size:11;column:pioneerId"`
	Name      string    `gorm:"size:255;column:name"`
	Title     string    `gorm:"size:255;column:title"`
	Email     string    `gorm:"size:255;column:wechat"`
	Introduce string    `gorm:"size:255;column:introduce"`
	Avatar    string    `gorm:"size:255;column:avatar"`
	FreeTime  string    `gorm:"size:255;column:freeTime"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:createdAt"`
	// 关联
	UserId int            `gorm:"size:11;column:userId;"`
	User   User           `gorm:"foreignKey:UserId"`
	Topics []PioneerTopic `gorm:"foreignKey:PioneerId;references:PioneerId"`
}

func (*Pioneer) TableName() string {
	return "pioneer"
}
