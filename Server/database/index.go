package database

import (
	"DB-Server/config"
	"DB-Server/models"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	// 全局数据库对象
	GDB *gorm.DB
)

// 打开数据库
func OpenDataBase() (err error) {
	if GDB == nil {
		GDB, err = gorm.Open(config.DBConfig.Driver, config.DBConfig.Source)

		if err != nil {
			log.Println("连接数据库失败")
		}

		// 单数命名表
		GDB.SingularTable(true)
	}
	return
}

// 关闭数据库
func CloseDataBase() {
	if GDB != nil {
		GDB.Close()
		GDB = nil
	}
}

// 自动迁移数据表,仅初始化时使用
func InitTable() {
	if GDB == nil {
		OpenDataBase()
	}

	// 删除原表
	GDB.DropTableIfExists(
		&models.User{},
		&models.Pioneer{},
		&models.Category{},
		&models.PioneerCate{},
		&models.PioneerTopic{},
	)

	// 自动迁移
	GDB.AutoMigrate(
		&models.User{},
		&models.Pioneer{},
		&models.Category{},
		&models.PioneerCate{},
		&models.PioneerTopic{},
	)

	// 添加外键
	GDB.Model(&models.Pioneer{}).AddForeignKey("userId", "user(userId)", "CASCADE", "CASCADE")
	GDB.Model(&models.PioneerCate{}).AddForeignKey("pioneerId", "pioneer(pioneerId)", "CASCADE", "CASCADE")
	GDB.Model(&models.PioneerCate{}).AddForeignKey("categoryId", "category(categoryId)", "CASCADE", "CASCADE")
	GDB.Model(&models.PioneerTopic{}).AddForeignKey("pioneerId", "pioneer(pioneerId)", "CASCADE", "CASCADE")
}
