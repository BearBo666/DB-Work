package models

import "time"

// 文章
type Article struct {
	ArticleId int       `gorm:"size:11;primary_key;column:articleId" json:"articleId"`
	Title     string    `gorm:"size:255;column:title" json:"title"`
	Contnet   string    `gorm:"type:longText;column:content" json:"content,omitempty"`
	PioneerId int       `gorm:"size:11;column:pioneerId" json:"-"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:createdAt" json:"createdAt"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updatedAt" json:"-"`
	// 关联
	Pioneer Pioneer `gorm:"foreignKey:PioneerId" json:"-"`
}

func (*Article) TableName() string {
	return "article"
}
