在线地址预览  http://prajna.xyz/

# Github-Full-Stack
本项目使用React Hook+Next.js+Koa2 来搭建一个github的简单版本,包括仓库展示,搜索,Issues和readme的展示


# 需要安装redis
## centos安装
更新安装源
```
sudo yum install epel-release
sudo yum update
```
安装redis
```
sudo yum install redis
```
后台启动redis
```
sudo systemctl start redis
```
设置开机启动redis
```
sudo systemctl enable redis
```
