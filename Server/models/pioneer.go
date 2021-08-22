package models

// 前人
type Pioneer struct {
	PioneerId int    `gorm:"primary_key;size:11;column:pioneerId"`
	UserId    int    `gorm:"size:11;column:userId"`
	Name      string `gorm:"size:255;column:name"`
	Title     string `gorm:"size:255;column:title"`
	Wechat    string `gorm:"size:255;column:wechat"`
	Phone     int    `gorm:"size:11;column:phone"`
	Introduce string `gorm:"size:255;column:introduce"`
	Avatar    string `gorm:"size:255;column:avatar"`
	FreeTime  string `gorm:"size:255;column:freeTime"`
	// 关联
	User User
}

func (*Pioneer) TableName() string {
	return "pioneer"
}
