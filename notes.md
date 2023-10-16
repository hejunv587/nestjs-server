# 知识点
## typeorm
* 设置mysql user里面的password字段,一定要给到default value
```    
@Column({ default: "123",  })
@IsNotEmpty()
password: string
```
* 修改entity, 要在app.module中添加,其中开启synchronize才会同步entity的改动,但是官方强调不要使用Setting synchronize: true shouldn't be used in production - otherwise you can lose production data. 小满建议使用autoLoadEntities
```
TypeOrmModule.forRoot({
    type: "mysql", //数据库类型
    username: "root", //账号
    password: "123456", //密码
    host: "localhost", //host
    port: 3306, //
    database: "db", //库名
    entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
    synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
    retryDelay: 500, //重试连接数据库间隔
    retryAttempts: 10,//重试连接数据库的次数
    autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  })
```

* entity修改的是表的结构,而修改完以后要修改dto,在user.service.ts中去做对应结构字段的赋值之类的修改
