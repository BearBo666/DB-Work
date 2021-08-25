package models

// 领域
type Category struct {
	CategoryId   int    `gorm:"primary_key;size:11;column:categoryId" json:"categoryId"`
	CategoryName string `gorm:"size:30;column:categoryName" json:"categoryName"`
	IconClass    string `gorm:"size:255;column:iconClass" json:"iconClass"`
}

func (*Category) TableName() string {
	return "category"
}
