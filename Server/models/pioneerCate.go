package models

// 前人-领域
type PioneerCate struct {
	Id         int `gorm:"primary_key;size:11"`
	PioneerId  int `gorm:"size:11;column:pioneerId"`
	CategoryId int `gorm:"size:11;column:categoryId"`
	// 关联
	Pioneer  Pioneer
	Category Category
}

func (*PioneerCate) TableName() string {
	return "pioneer_category"
}
