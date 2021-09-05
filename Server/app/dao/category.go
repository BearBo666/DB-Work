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

	result := GDB.Find(&categoryList)
	err = result.Error
	return
}

// 创建一个分类
func (*CategoryDaoManage) Create(categoryName, iconClass string) (category *Category, err error) {

	category = &Category{CategoryName: categoryName, IconClass: iconClass}
	if err = GDB.Create(category).Error; err != nil {
		return nil, err
	}

	return
}

// 更新分类内容
func (*CategoryDaoManage) Update(id int, rows map[string]interface{}) (err error) {
	err = GDB.Model(&Category{}).Where("categoryId", id).Updates(rows).Error
	return
}

// 删除分类
func (*CategoryDaoManage) Delete(id int) (err error) {
	err = GDB.Delete(&Category{}, id).Error
	return
}
