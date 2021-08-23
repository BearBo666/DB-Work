package database

import (
	"DB-Server/config"
	"DB-Server/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	// 全局数据库对象
	GDB *gorm.DB
)

// 打开数据库
func OpenDataBase() (err error) {
	if GDB == nil {
		GDB, err = gorm.Open(mysql.Open(config.DBConfig.Source))

		if err != nil {
			log.Println("连接数据库失败")
		}
	}
	return
}

// 自动迁移数据表,仅初始化时使用
func InitTable() {
	if GDB == nil {
		OpenDataBase()
	}

	// 自动迁移
	GDB.AutoMigrate(
		&models.User{},
		&models.Pioneer{},
		&models.Category{},
		&models.PioneerCate{},
		&models.PioneerTopic{},
	)
}
