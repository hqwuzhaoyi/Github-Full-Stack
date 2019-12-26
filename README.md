在线地址预览  http://prajna.xyz/

# Github-Full-Stack
本项目使用React Hook+Next.js+Koa2 来搭建一个github的简单版本,数据来源Github OAUTH,包括仓库展示,搜索,Issues和readme的展示

![oauth](https://wuzhaoyi.oss-cn-shanghai.aliyuncs.com/imgs/OAUTH%20%282%29.jpg)

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
# 安装nginx
## nginx配置
```
vi /etc/nginx/conf.d/next.conf

//next.conf
server {
        listen          80;
        listen          [::]:80;
        server_name     prajna.xyz;

        location / {
                proxy_pass http://localhost:3000;
                proxy_set_header Host $host:$server_port;
        }
}
```

## nginx 重启
service reload nginx
# 启动
```
 cp config.sample.js config.js
 
```

# PM2 持续启动
```
pm2 start ecosystem.config.js
pm2 list
```

