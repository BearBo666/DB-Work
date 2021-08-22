package dto

type Ret struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
	Msg  string      `json:"msg"`
}

const (
	SUCCESS = 10000
	FAIL    = 20000
	ERROR   = 30000
)

// 请求成功
func Ok() (r Ret) {
	r.Code = SUCCESS
	r.Msg = "Success"
	return
}

// 请求成功并返回数据
func OkAndData(data interface{}) (r Ret) {
	r.Code = SUCCESS
	r.Msg = "Success"
	r.Data = data
	return
}

// 失败返回默认信息
func Fail() (r Ret) {
	r.Code = FAIL
	r.Msg = "Fail"
	return
}

// 失败自定义信息
func FailAndMsg(msg string) (r Ret) {
	r.Code = FAIL
	r.Msg = msg
	return
}

// 服务端出错
func Error() (r Ret) {
	r.Code = ERROR
	r.Msg = "Server error"
	return
}
