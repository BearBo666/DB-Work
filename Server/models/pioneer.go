package models

import (
	"time"
)

// 前人
type Pioneer struct {
	PioneerId int       `gorm:"primary_key;size:11;column:pioneerId"`
	UserId    int       `gorm:"size:11;column:userId;unique;not null"`
	Name      string    `gorm:"size:255;column:name"`
	Title     string    `gorm:"size:255;column:title"`
	Email     string    `gorm:"size:255;column:wechat"`
	Introduce string    `gorm:"size:255;column:introduce"`
	Avatar    string    `gorm:"size:255;column:avatar"`
	FreeTime  string    `gorm:"size:255;column:freeTime"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	// 关联
	User   User           `gorm:"foreignKey:UserId"`
	Topics []PioneerTopic `gorm:"foreignKey:PioneerId;ASSOCIATION_FOREIGNKEY:PioneerId"`
}

func (*Pioneer) TableName() string {
	return "pioneer"
}
