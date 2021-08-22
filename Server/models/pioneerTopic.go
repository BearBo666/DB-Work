package models

// 前人所擅长的话题
type PioneerTopic struct {
	TopicId   int    `gorm:"primary_key;size:11;column:topicId"`
	Title     string `gorm:"size:255;column:title"`
	Content   string `gorm:"type:longText;column:content"`
	PioneerId int    `gorm:"size:11;column:pioneerId"`
	// 关联
	Pioneer Pioneer
}

func (*PioneerTopic) TableName() string {
	return "pioneer_topic"
}
