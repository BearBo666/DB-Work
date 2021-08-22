package models

// 领域
type Category struct {
	CategoryId   int    `gorm:"primary_key;size:11;column:categoryId"`
	CategoryName string `gorm:"size:20;column:categoryName"`
	IconClass    string `gorm:"size:255;column:iconClass"`
}

func (*Category) TableName() string {
	return "category"
}
