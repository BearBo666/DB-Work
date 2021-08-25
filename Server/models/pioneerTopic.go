package models

// 前人所擅长的话题
type PioneerTopic struct {
	TopicId   int    `gorm:"primary_key;size:11;column:topicId" json:"topicId"`
	Title     string `gorm:"size:255;column:title" json:"title"`
	Content   string `gorm:"type:longText;column:content" json:"content"`
	PioneerId int    `gorm:"size:11;column:pioneerId" json:"-"`
	// 关联
	// Pioneer Pioneer `gorm:"foreignKey:PioneerId"`
}

type Topic struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func (*PioneerTopic) TableName() string {
	return "pioneer_topic"
}
