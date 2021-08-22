package dao

import (
	. "DB-Server/database"
	. "DB-Server/models"
)

type CategoryDaoManage struct {
}

var CategoryDao CategoryDaoManage

// 查询所有分类
func (*CategoryDaoManage) FindAll() (categoryList []Category, err error) {
	err = OpenDataBase()
	defer CloseDataBase()
	if err != nil {
		return
	}

	result := GDB.Find(&categoryList)
	err = result.Error
	return
}

// 创建一个分类
func (*CategoryDaoManage) Create(categoryName, iconClass string) (category *Category, err error) {
	err = OpenDataBase()
	defer CloseDataBase()
	if err != nil {
		return
	}

	category = &Category{CategoryName: categoryName, IconClass: iconClass}
	err = GDB.Create(category).Error

	return
}