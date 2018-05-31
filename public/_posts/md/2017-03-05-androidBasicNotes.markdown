---
layout:     post
title:      "Android Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Android
    - Java
---

* [Android Framework](#android-framework)
	* [Dalvik virtual machine](#dalvik-virtual-machine)
	* [Basic Building Blocks](#basic-building-blocks)
* [Android Studio](#android-studio)
	* [Plugins](#plugins)
		* [Code generator](#code-generator)
* [API Conventions](#api-conventions)
	* [Manager.Service](#managerservice)
* [Activity](#activity)
	* [BaseActivity](#baseactivity)
	* [Activity Collector](#activity-collector)
	* [StartActivity](#startactivity)
* [UI Design](#ui-design)
	* [Layout](#layout)
		* [Basic](#basic)
		* [TableLayout](#tablelayout)
		* [Custom Layout](#custom-layout)
	* [Component](#component)
		* [Custom Component](#custom-component)
		* [AlertDialog](#alertdialog)
		* [ListView](#listview)
			* [Custom ListView Layout](#custom-listview-layout)
			* [Custom ListView Listener](#custom-listview-listener)
	* [Drawable](#drawable)
* [Fragment](#fragment)
	* [Basic](#basic-1)
		* [Xml in Activity.xml](#xml-in-activityxml)
		* [Create View in Fragment](#create-view-in-fragment)
		* [Add Fragment in Activity](#add-fragment-in-activity)
	* [Transfer Information](#transfer-information)
		* [In Activity](#in-activity)
		* [In Fragment](#in-fragment)
	* [Runtime Loop](#runtime-loop)
		* [Basic Override Funciton](#basic-override-funciton)
* [Broadcast](#broadcast)
	* [Register Receiver](#register-receiver)
		* [In Activity](#in-activity-1)
		* [In AndroidManifest,xml](#in-androidmanifestxml)
	* [Custom Broadcast](#custom-broadcast)
		* [Normal Broadcast](#normal-broadcast)
		* [Ordered Broadcast](#ordered-broadcast)
	* [Local Broadcast](#local-broadcast)
		* [Local Brodcast](#local-brodcast)
		* [Local Receiver](#local-receiver)
* [Data Store](#data-store)
	* [Files Store](#files-store)
		* [Write](#write)
		* [Read](#read)
	* [SharedPreferences](#sharedpreferences)
		* [Write](#write-1)
		* [Read](#read-1)
	* [DataBase](#database)
		* [SQLiteOpenHelper](#sqliteopenhelper)
			* [establish table](#establish-table)
		* [Basic Operator](#basic-operator)
		* [Transaction](#transaction)
* [Content Provider](#content-provider)
	* [Read Other App Content](#read-other-app-content)
	* [Provide App Content](#provide-app-content)
		* [IBinder](#ibinder)
	* [ForeGround Service](#foreground-service)
	* [IntentService(Thread)](#intentservicethread)
	* [Alarm Service](#alarm-service)

# Android Framework

## Dalvik virtual machine
1. register-based machine
基于寄存器(不写入内存)
2. minimizeing instruction diapath and memory accesses
最小化指令分配黑内存访问
3. giving more efficient instruction stream(a lot more semantic content)
提供更加高效的指令流

## Basic Building Blocks
1. Activity(Managed by activity stack)
2. Service(Running in the background;with no UI)
3. Broadcast Receiver(Can invoke(调用) activity;with no UI)
4. Content Provider(accessing and managing application data)

---

# Android Studio

## Plugins
### Code generator
- Constructor
- getter/setter
- ViewHolder
- Parcelable Implemention
- GsonFormat : 根据JSONObject生成相应类

# API Conventions
## Manager.Service
- PreferenceManager.getDefaultSharedPreferences
- LocalBroadcastManager.getInstance

# Activity

## BaseActivity

查看当前界面属于哪个Activity，自定义Activity继承BaseActivity

```java
public class BaseActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("BaseActivity", getClass().getSimpleName());
    }
}
```

## Activity Collector
在所有Activity的onCreate方法调用静态的addActivity方法，onDestroy方法调用静态的removeActivity方法。

- `ActivityCollector.addActivity(this);`
- `ActivityCollector.removeActivity(this);`

```java
public class ActivityCollector {

    public static List<Activity> activities = new ArrayList<Activity>();

    public static void addActivity(Activity activity) {
        activities.add(activity);

    }

    public static void removeActivity(Activity activity) {
        activities.remove(activity);

    }

    public static void finishAll() {
        for (Activity activity : activities) {
            if (!activity.isFinishing()) {
                activity.finish();
            }
        }
    }
}
```

## StartActivity

为每个Activity添加静态的actionStart方法，供其他Activity启用此Activity

```java
public static void actionStart(Context context, String data1, String data2) {
    Intent intent = new Intent(context, thisActivity.class);
    intent.putExtra("param1", data1);
    intent.putExtra("param2", data2);
    context.startActivity(intent);
}
```

---

    
# UI Design

> N activities can respond to a particular intent:
Android will pop(弹出) up a little dialogue list(对话框) to user showing application icon defining the intent

当有多个活动可相应某个特定意图时，系统将会弹出对话框提示用户选择一个应用的活动或者设定默认值(default)

e.g web browsers

```html
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```

## Layout
### Basic
- `android:layout_weight`
自适配布局
- `android:SingleLine` 单行显示模式
- `android:ellipsize="end"` 文字过多时缩略方式
### TableLayout
- `<TableLayout android:stretchColumns="1">` 拉伸第2列
- `android:layout_span="2"` 占2列

### Custom Layout

LayoutInflater作用是将layout的xml布局文件实例化为View类对象。
```java
View view = LayoutInflater.from(context).inflate(R.layout.title, this/null);
```

## Component
View(ViewGroup): e.g button、textbox(文本框)、checkbox(复选框)

### Custom Component
1. custom Xml
  - titie.xml
```html
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/title_bg" >
<Button
    android:id="@+id/title_back"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:layout_margin="5dip"
    android:background="@drawable/back_bg"
    android:text="Back"
    android:textColor="#fff" />
<TextView
    android:id="@+id/title_text"
    android:layout_width="0dip"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:layout_weight="1"
    android:gravity="center"
    android:text="Title Text"
    android:textColor="#fff"
    android:textSize="24sp" />
<Button
    android:id="@+id/title_edit"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:layout_margin="5dip"
    android:background="@drawable/edit_bg"
    android:text="Edit"
    android:textColor="#fff" />
</LinearLayout>
```
2. custom class
```java
public class TitleLayout extends LinearLayout {
    public TitleLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        LayoutInflater.from(context).inflate(R.layout.title, this);

        //Register button click Listener
        titleBack.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                ((Activity) getContext()).finish();
            }
        });
        titleEdit.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "You clicked Edit button", Toast.LENGTH_SHORT).show();
            }
        });

        //other awesome things
        //like material design ripple effect
        //animations and music
    }

}
```
### AlertDialog
```java
//builder pattern
AlertDialog.Builder dialogBuilder = new AlertDialog.Builder(context);

dialogBuilder.setTitle("Warning");
dialogBuilder.setMessage("You are forced to be offline. Please try to login again.");
dialogBuilder.setCancelable(false);
dialogBuilder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
    @Override
    public void onClick(DialogInterface dialog, int which) {
        ActivityCollector.finishAll(); // 销毁所有活动
        Intent intent = new Intent(context, LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent); // 重新启动LoginActivity
    }
});

AlertDialog alertDialog = dialogBuilder.create();

// 需要设置AlertDialog的类型,保证在广播接收器中可以正常弹出
alertDialog.getWindow().setType(WindowManager.LayoutParams.TYPE_SYSTEM_ALERT);

alertDialog.show();
```
### ListView

```java
ArrayAdapter<String> adapter = new ArrayAdapter<String>(
    MainActivity.this, android.R.layout.simple_list_item_1, data
);
listView.setAdapter(adapter);
```
#### Custom ListView Layout

- Custom class
- Custom Sub Xml(单项)
- Custom ArrayAdapter
  - 重写构造函数
  - 重写getView方法 
    - 重用convertView提升性能
    - ViewHolder提升性能

```java

//内部类，其中字段与自定义class的字段一致
class ViewHolder {
    ImageView fruitImage;
    TextView fruitName;
}
public FruitAdapter(Context context, int textViewResourceId, List<Fruit> objects) {
    super(context, textViewResourceId, objects);
    resourceId = textViewResourceId;
}

@Override
public View getView(int position, View convertView, ViewGroup parent) {

    Fruit fruit = getItem(position); // 获取当前项的Fruit实例
    View view;
    ViewHolder viewHolder;

    //大幅提升性能
    if (convertView == null) {
        view = LayoutInflater.from(getContext()).inflate(resourceId, null);

        viewHolder = new ViewHolder();
        viewHolder.fruitImage = (ImageView) view.findViewById(R.id.fruit_image);
        viewHolder.fruitName = (TextView) view.findViewById(R.id.fruit_name);
        view.setTag(viewHolder); // 将ViewHolder存储在View中

    } else {
        view = convertView;
        viewHolder = (ViewHolder) view.getTag(); // 重新获取ViewHolder
    }
    
    ImageView fruitImage = (ImageView) view.findViewById(R.id.fruit_image);
    TextView fruitName = (TextView) view.findViewById(R.id.fruit_name);
    fruitImage.setImageResource(fruit.getImageId());
    fruitName.setText(fruit.getName());
    return view;
}
```

#### Custom ListView Listener

```java
listView.setOnItemClickListener(new OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Fruit fruit = fruitList.get(position);
        Toast.makeText(MainActivity.this, fruit.getName(), Toast.LENGTH_SHORT).show();
    }
});

adapter.notifyDataSetChanged();           // 当有新消息时,刷新ListView中的显示
msgListView.setSelection(msgList.size()); // 将ListView定位到最后一行
```

## Drawable
1. 修改特定组件的背景颜色

```java
Resources myColor=getBaseContext().getResources();
//getBaseContext()获得基础Context
//getResources()获得资源
Drawable color_M=myColor.getDrawable(R.color. lightgreen );
//由资源 myColor来获得Drawable
R.color.lightgreen是颜色值的ID引用
text.setBackgroundDrawable(color_M);
//设置背景
```
---

# Fragment
android.app.Fragment
## Basic
### Xml in Activity.xml
```html
<fragment
    android:id="@+id/right_fragment"
    <!-- custom fragment class -->
    android:name="com.example.fragmenttest.RightFragment"
    android:layout_width="0dp"
    android:layout_height="match_parent"
    android:layout_weight="1" />
```
### Create View in Fragment
```java
@Override
public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    View view = inflater.inflate(R.layout.left_fragment, container, false);
    return view;
}
```
### Add Fragment in Activity
```java
AnotherRightFragment fragment = new AnotherRightFragment();
FragmentTransaction transaction = getFragmentManager.beginTransaction();

//容器的 id 和待添加的碎片实例
transaction.replace(R.id.right_layout, fragment);
//模拟返回栈
transaction.addToBackStack(null);
transaction.commit();
```
## Transfer Information
### In Activity
`getFragmentManager().findFragmentById(R.id.right_fragment);`
### In Fragment
`MainActivity activity = (MainActivity) getActivity();`

## Runtime Loop
### Basic Override Funciton
- `onAttach()`
当碎片和活动建立关联的时候调用。
- `onCreateView()`
为碎片创建视图(加载布局)时调用。
- `onActivityCreated()`
确保与碎片相关联的活动一定已经创建完毕的时候调用。
- `onDestroyView()`
当与碎片关联的视图被移除的时候调用。
- `onDetach()`
当碎片和活动解除关联的时候调用。

---

# Broadcast
- Normal Broadcasts : async
- Ordered Broadcasts : sync

## Register Receiver

### In Activity
```java
//Custom BroadcastReceiver,Override onReceive methods
//intentFilter : action
//前为响应后的行为，后为响应何种广播
registerReceiver(networkChangeReceiver, intentFilter);

//in onDestroy
unregisterReceiver();
```
### In AndroidManifest,xml
```html
<!-- custom receiver class -->
<receiver android:name=".MyBroadcastReceiver">
<!-- receiver priority -->
<intent-filter android:priority="100">
<!-- custom broadcast -->
<action android:name="com.example.broadcasttest. MY_BROADCAST"/>
</intent-filter>
</receiver>
```

## Custom Broadcast

### Normal Broadcast
```java
intent intent = new Intent("com.example.broadcasttest.MY_BROADCAST");
sendBroadcast(intent);
```

### Ordered Broadcast
```java
intent intent = new Intent("com.example.broadcasttest.MY_BROADCAST");
sendOrderedBroadcast(intent, null);
```

## Local Broadcast
```java
// 获取实例
localBroadcastManager = LocalBroadcastManager.getInstance(this);
```
### Local Brodcast
```java
localBroadcastManager.sendBroadcast(intent); // 发送本地广播
```
### Local Receiver
```java
localBroadcastManager.registerReceiver(CustomReceiver, intentFilter);
localBroadcastManager.unregisterReceiver(CustomReceiver);
```

---

# Data Store

## Files Store
`/data/data/<packagename>/files/`

### Write
```java
String data = "Data to save";
FileOutputStream out = null;
BufferedWriter writer = null;
try {
    out = openFileOutput("data", Context.MODE_PRIVATE);
    writer = new BufferedWriter(new OutputStreamWriter(out));
    writer.write(data);
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try {
        if (writer != null) {
            writer.close();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

### Read
```java
FileInputStream in = null;
BufferedReader reader = null;
StringBuilder content = new StringBuilder();
try {
    in = openFileInput("data");
    reader = new BufferedReader(new InputStreamReader(in));
    String line = "";
    while ((line = reader.readLine()) != null) {
        content.append(line);
    }
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (reader != null) {
        try {
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

return content.toString();
```

## SharedPreferences
`/data/data/<packagename>/shared_prefs/`

### Write
```java
//get Editor
SharedPreferences.Editor editor = getSharedPreferences("data", MODE_PRIVATE).edit();
//store date
editor.putString("name", "Tom");
editor.putInt("age", 28);
editor.putBoolean("married", false);
//commit
editor.commit();
```
```java
editor.clear();
```
clear pref file content

### Read
```java
SharedPreferences pref = getSharedPreferences("data", MODE_PRIVATE);
//second argument - default value if target key don't exists
String name = pref.getString("name", "");
int age = pref.getInt("age", 0);
boolean married = pref.getBoolean("married", false);
```

## DataBase
/data/data/<package name>/databases/
### SQLiteOpenHelper
```java
@Override
onCreate()
@Override
public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    switch (oldVersion) {
        case 1:
            db.execSQL(CREATE_CATEGORY);
        case 2:
            db.execSQL("alter table Book add column category_id integer");
        default:
    }
}
```
Custom实现创建、升级数据库的逻辑  
构建出SQLiteOpenHelper 的实例后,再调用`getReadableDatabase()`或`getWritableDatabase()`方法创建数据库

#### establish table 
```sql
create table Book (
    id integer primary key autoincrement,
    author text,
    price real,
    pages integer,
    name text
    )
```
### Basic Operator

- 创建一个新的数据库并返回一个 SQLiteDatabase 对象  
```java
Context.createDatabase(String name,int version ,int mode,CursorFactory factory);
```
- 删除数据库  
```java
this.deleteDatabase("myDatabase.db");
```
- 打开数据库  
```java
SQLiteDatabase my_DataBase = 
this.openOrCreateDatabase("myDateBase.db",MODE_PRIVATE , null);
my_DataBase.close();
```
- 非查询SQL指令   

```java
//创建一个名为"test"并带两个参数的表
my_DataBase.execSQL("CREATE TABLE test (_id INTEGER PRIMARY KEY,
someNumber INTERGER);");
//在数据库中插入一个元组
my_DataBase.execSQL("INSERT INTO test (_id,someNumber) values(1,8);");

SQLiteDatabase db = dbHelper.getWritableDatabase();

//INSERT
ContentValues values = new ContentValues();
// 开始组装第一条数据
values.put("name", "The Da Vinci Code");
values.put("author", "Dan Brown");
values.put("pages", 454);
values.put("price", 16.96);
db.insert("Book", null, values); // 插入第一条数据
values.clear();
// 开始组装第二条数据
values.put("name", "The Lost Symbol");
values.put("author", "Dan Brown");
values.put("pages", 510);
values.put("price", 19.95);
db.insert("Book", null, values); // 插入第二条数据

//update 
ontentValues values = new ContentValues();
values.put("price", 10.99);
db.update("Book", values, "name = ?", new String[] { "The DaVinci Code"  });

//delete
db.delete("Book", "pages > ?", new String[] { "500"  });

//删除表
my_DataBase.execSQL("DROP TABLE test");
```
- 查询SQL指令-游标Cursors
    - `query()`

|方法参数|对应 SQL 部分|描述|
|:------:|:----------:|:------------:|
|table|from tableName|指定查询的表名|
|columns|select column1, column2|指定查询的列名|
|selection|where column = value|指定 where 的约束条件|
|selectionArgs|-|为 where 中的占位符提供具体的值|
|groupBy|group by column|指定需要 group by 的列|
|having|having column = value|对 group by 后的结果进一步约束|
|orderBy|order by column1, column2|指定查询结果的排序方式|

```java
SQLiteDatabase db = dbHelper.getWritableDatabase();
// 查询Book表中所有的数据
Cursor cursor = db.query("Book", null, null, null, null, null, null);
// 遍历Cursor对象,取出数据
//cursor.moveToFirst()
//cursor.moveToNext()
String name = cursor.getString(cursor.getColumnIndex("name"));
String author = cursor.getString(cursor.getColumnIndex("author"));
int pages = cursor.getInt(cursor.getColumnIndex("pages"));
double price = cursor.getDouble(cursor.getColumnIndex("price"));
```

```java
//为了创建一个Cursor(游标),必须执行一个查询,要么通过SQL使用rawQuery()方法
//或是更精心设计的方法,像query()方法
Cursor cur = my_DataBase.rawQuery("SELECT * FORM test", null);

if(cur!=null) {//游标不为空
    //返回给定名称的列的基于0开始的index,如果该属性列不存在则返回-1
    //通过它们的index来检索属性值
    int numColumn=cur.getColumnIndex("someNumber");

    if(cur.moveToFirst()) {
        //cur.moveToFirst()让游标指向第一行,如果游标指向第一行,则返回true
        do {
        int num=cur.getInt(numColumn);//获得当前行该属性的值
        /*Cursor提供了不同的方法来回索不同的数据类型
        例如getInt(int index)/getString(int index)等等*/
        /*做一些事情*/
        } while (cur.moveToNext());
        /*游标移动到下一行,如果游标已经通过了结果集中的最后,
        即没有行可以移动时,则返回false*/
        //其他可能移动的是 previous() 和first()方法
    }
}
```

### Transaction
- SQLiteDatabase 的`beginTransaction()`方法
- 调用`setTransactionSuccessful()`表示事务已经执行成功
- finally代码块中调用`endTransaction()`来结束事务

---

# Content Provider

## Read Other App Content
```java
Uri uri = Uri.parse("content://com.example.app.provider/table1");
getContentResolver().query/insert/delete/update();
```
- ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME
- ContactsContract.CommonDataKinds.Phone.NUMBER

## Provide App Content
With CotentProvider
```java
public class MyProvider extends ContentProvider {
    @Override
    public boolean onCreate() {
        return false;
    }
    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        return null;
    }
    @Override
    public Uri insert(Uri uri, ContentValues values) {
        return null;
    }
    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        return 0;
    }
    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }
    @Override
    public String getType(Uri uri) {
        return null;
    }
}
```

```UriMatcher.addURI(uri, customNumber)/.match(uri)```
- 为传入URI指定自定义常量作为代号

---

# Service

## Handler
```java
//在主线程重写handleMessage,更新UI
new Handler() {
    public void handleMessage(Message msg) {
        switch (msg.what) {
            case UPDATE_TEXT:
            // 在这里可以进行UI操作
            text.setText("Nice to meet you");
            break;
            default:
            break;
        }
    }
}

//在后台执行子线程
new Thread(new Runnable() {
    @Override
    public void run() {
        Message message = new Message();
        message.what = UPDATE_TEXT;
        handler.sendMessage(message); // 将Message对象发送出去
    }
}).start();
```
## AsyncTask
AsyncTask 中的几个方法才能完成对任务的定制。经常需要去重写的方法
有以下四个。
1. `onPreExecute()`
这个方法会在后台任务开始执行之前调用,用于进行一些界面上的初始化操作,比
如显示一个进度条对话框等。
2. `doInBackground(Params...)`
这个方法中的所有代码都会在子线程中运行,我们应该在这里去处理所有的耗时任
务。任务一旦完成就可以通过 return 语句来将任务的执行结果返回,如果 AsyncTask 的
第三个泛型参数指定的是 Void,就可以不返回任务执行结果。注意,在这个方法中是不
可以进行 UI 操作的,如果需要更新 UI 元素,比如说反馈当前任务的执行进度,可以调
用 publishProgress(Progress...)方法来完成。
3. `onProgressUpdate(Progress...)`
当在后台任务中调用了 publishProgress(Progress...)方法后,这个方法就会很快被调
用,方法中携带的参数就是在后台任务中传递过来的。在这个方法中可以对 UI 进行操
作,利用参数中的数值就可以对界面元素进行相应地更新。
4. `onPostExecute(Result)`
当后台任务执行完毕并通过 return 语句进行返回时,这个方法就很快会被调用。返
回的数据会作为参数传递到此方法中,可以利用返回的数据来进行一些 UI 操作,比如
说提醒任务执行的结果,以及关闭掉进度条对话框等。

```java
class DownloadTask extends AsyncTask<Void, Integer, Boolean> {
    @Override
    protected void onPreExecute() {
        progressDialog.show(); // 显示进度对话框
    }
    @Override
    protected Boolean doInBackground(Void... params) {
        try {
            while (true) {
                int downloadPercent = doDownload(); // 这是一个虚构的方法
                publishProgress(downloadPercent);
            if (downloadPercent >= 100) {
                break;
                }
            }
        } catch (Exception e) {
            return false;
        }
    return true;
}
    @Override
    protected void onProgressUpdate(Integer... values) {
        // 在这里更新下载进度
        progressDialog.setMessage("Downloaded " + values[0] + "%");
    }
    @Override
    protected void onPostExecute(Boolean result) {
        progressDialog.dismiss(); // 关闭进度对话框
        // 在这里提示下载结果
        if (result) {
            Toast.makeText(context, "Download succeeded",
            Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(context, " Download failed",
            Toast.LENGTH_SHORT).show();
        }
    }
}
```

## Basic

```html
//in AndroidManifest.xml
<service android:name=".MyService" >
</service>
```
```stopSelf()```

```java
public class MyService extends Service {
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
    @Override
        public void onCreate() {
        super.onCreate();
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
```
### IBinder
- In Custom Service class  
```java
private DownloadBinder mBinder = new DownloadBinder();

class DownloadBinder extends Binder {
    public void startDownload() {
        Log.d("MyService", "startDownload executed");
    }
    public int getProgress() {
        Log.d("MyService", "getProgress executed");
        return 0;
    }
}

@Override
public IBinder onBind(Intent intent) {
    return mBinder;
}
```
- In Activity class  
```java
case R.id.bind_service:
    Intent bindIntent = new Intent(this, MyService.class);
    bindService(bindIntent, connection, BIND_AUTO_CREATE); // 绑定服务
    break;
case R.id.unbind_service:
    unbindService(connection); // 解绑服务
    break;
default:
    break;
    
@Override
public void onServiceDisconnected(ComponentName name) {
    }
@Override
public void onServiceConnected(ComponentName name, IBinder service) {
    downloadBinder = (MyService.DownloadBinder) service;
    downloadBinder.startDownload();
    downloadBinder.getProgress();
}
```

## ForeGround Service
    - In service onCreate  
```java
Notification notification = new Notification(R.drawable.ic_launcher, "Notification comes", System. currentTimeMillis());
Intent notificationIntent = new Intent(this, MainActivity.class);
PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);
notification.setLatestEventInfo(this, "This is title", "This is content", pendingIntent);
startForeground(1, notification);
```

## IntentService(Thread)
```java
public class MyIntentService extends IntentService {
    public MyIntentService() {
        super("MyIntentService"); // 调用父类的有参构造函数
    }
    @Override
    protected void onHandleIntent(Intent intent) {
        // 打印当前线程的id
        Log.d("MyIntentService", "Thread id is " + Thread.currentThread().getId());
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d("MyIntentService", "onDestroy executed");
    }
}
```

## Alarm Service
结合BroadcastReceiver可以实现定时任务

```java
AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
long triggerAtTime = SystemClock.elapsedRealtime() + 10 * 1000;
manager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, triggerAtTime, pendingIntent);
```

- Service延时发出广播
- BroadcastReceiver接受广播后再次启动Service
```java
public int onStartCommand(Intent intent, int flags, int startId) {
    new Thread(new Runnable() {
        @Override
        public void run() {
            Log.d("LongRunningService", "executed at " + new Date().toString());
        }
    }).start();
    
    AlarmManager manager = (AlarmManager) getSystemService(ALARM_SERVICE);
    int anHour = 60 * 60 * 1000; // 这是一小时的毫秒数
    long triggerAtTime = SystemClock.elapsedRealtime() + anHour;
    
    //关键：在服务里发送广播
    Intent i = new Intent(this, AlarmReceiver.class);
    PendingIntent pi = PendingIntent.getBroadcast(this, 0, i, 0);
    
    manager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, triggerAtTime, pi);
    
    return super.onStartCommand(intent, flags, startId);
}



---

# Media

## Notification

```java
NotificationManager manager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);

Notification notification = new Notification(R.drawable.ic_launcher, "This is ticker text", System.currentTimeMillis());

Intent intent = new Intent(this, NotificationActivity.class);
PendingIntent pi = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);

notification.setLatestEventInfo(this, "This is content title", "This is content text", pi);

manager.notify(1, notification);
//在被启动Activity manager.cancel(1);
```
## SMS
## Audio
## Music

---

# NetWork                     
Networked Apps  
1. Network latency(网络延迟)——UI thread seperated from data loading thread
2. Battery drain(电池耗尽)
3. Intermittent service(中断服务)

## WebView
```html
<uses-permission android:name="android.permission.INTERNET" />
```

### Three Steps
```java
webView.getSettings().setJavaScriptEnabled(true);

webView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url); // 根据传入的参数再去加载新的网页
        return true; // 表示当前WebView可以处理打开新网页的请求,不用借助系统浏览器
    }
});

webView.loadUrl("http://www.github.com");
```
## HttpURLConnection
## HttpClient
## XML
### Pull
```java
HttpClient httpClient = new DefaultHttpClient();

// 指定访问的服务器地址是电脑本机
HttpGet httpGet = new HttpGet("http://10.0.2.2/get_data.xml");
HttpResponse httpResponse = httpClient.execute(httpGet);

if (httpResponse.getStatusLine().getStatusCode() == 200) {
    // 请求和响应都成功了
    HttpEntity entity = httpResponse.getEntity();
    String response = EntityUtils.toString(entity,"utf-8");
    
    //XML Pull 方式解析
    XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
    XmlPullParser xmlPullParser = factory.newPullParser();
    xmlPullParser.setInput(new StringReader(xmlData));
    int eventType = xmlPullParser.getEventType();
    
    String id = "";
    String name = "";
    String version = "";
    
    while (eventType != XmlPullParser.END_DOCUMENT) {
        
        String nodeName = xmlPullParser.getName();
        
        switch (eventType) {
        // 开始解析某个结点
        case XmlPullParser.START_TAG: {
            if ("id".equals(nodeName)) {
                id = xmlPullParser.nextText();
            } else if ("name".equals(nodeName)) {
                name = xmlPullParser.nextText();
            } else if ("version".equals(nodeName)) {
                version = xmlPullParser.nextText();
            }
            break;
        }
        // 完成解析某个结点
        case XmlPullParser.END_TAG: {
            if ("app".equals(nodeName)) {
                Log.d("MainActivity", "id is " + id);
                Log.d("MainActivity", "name is " + name);
                Log.d("MainActivity", "version is " + version);
            }
            break;
        }
        default:
            break;
        }
        
        eventType = xmlPullParser.next();
    } // end of while
}  //  end of if
```

### SAX
#### DefaultHandler
```java
public class ContentHandler extends DefaultHandler {
    private String nodeName;
    private StringBuilder id;
    private StringBuilder name;
    private StringBuilder version;
    
    @Override
    public void startDocument() throws SAXException {
        id = new StringBuilder();
        name = new StringBuilder();
        version = new StringBuilder();
    }
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        // 记录当前结点名
        nodeName = localName;
    }
    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        // 根据当前的结点名判断将内容添加到哪一个StringBuilder对象中
        if ("id".equals(nodeName)) {
            id.append(ch, start, length);
        } else if ("name".equals(nodeName)) {
            name.append(ch, start, length);
        } else if ("version".equals(nodeName)) {
            version.append(ch, start, length);
        }
    }
    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if ("app".equals(localName)) {
            Log.d("ContentHandler", "id is " + id.toString().trim());
            Log.d("ContentHandler", "name is " + name.toString().trim());
            Log.d("ContentHandler", "version is " + version.toString().trim());
            // 最后要将StringBuilder清空掉
            id.setLength(0);
            name.setLength(0);
            version.setLength(0);
        }
    }
    @Override
    public void endDocument() throws SAXException {
    }
}
```
```java
HttpClient httpClient = new DefaultHttpClient();
// 指定访问的服务器地址是电脑本机
HttpGet httpGet = new HttpGet("http://10.0.2.2:8080/get_data.xml");
HttpResponse httpResponse = httpClient.execute(httpGet);

if (httpResponse.getStatusLine().getStatusCode() == 200) {
    // 请求和响应都成功了
    HttpEntity entity = httpResponse.getEntity();
    String response = EntityUtils.toString(entity, "utf-8");
    
    SAXParserFactory factory = SAXParserFactory.newInstance();
    XMLReader xmlReader = factory.newSAXParser().getXMLReader();
    ContentHandler handler = new ContentHandler();
    
    // 将ContentHandler的实例设置到XMLReader中
    xmlReader.setContentHandler(handler);
    // 开始执行解析
    xmlReader.parse(new InputSource(new StringReader(xmlData)));
```

## JSON

### JSONObject

```java
HttpClient httpClient = new DefaultHttpClient();
// 指定访问的服务器地址是电脑本机
HttpGet httpGet = new HttpGet("http://10.0.2.2/get_data.json");
HttpResponse httpResponse = httpClient.execute(httpGet);

if (httpResponse.getStatusLine().getStatusCode() == 200) {
    // 请求和响应都成功了
    HttpEntity entity = httpResponse.getEntity();
    String response = EntityUtils.toString(entity, "utf-8");
    
    JSONArray jsonArray = new JSONArray(response);
    
    for (int i = 0; i < jsonArray.length(); i++) {
        JSONObject jsonObject = jsonArray.getJSONObject(i);
        String id = jsonObject.getString("id");
        String name = jsonObject.getString("name");
        String version = jsonObject.getString("version");
    }
}
```

### GSON

```java
HttpClient httpClient = new DefaultHttpClient();
// 指定访问的服务器地址是电脑本机
HttpGet httpGet = new HttpGet("http://10.0.2.2/get_data.json");
HttpResponse httpResponse = httpClient.execute(httpGet);

if (httpResponse.getStatusLine().getStatusCode() == 200) {
    // 请求和响应都成功了
    HttpEntity entity = httpResponse.getEntity();
    String response = EntityUtils.toString(entity, "utf-8");
    
    Gson gson = new Gson();
    List<App> appList = gson.fromJson(response, new TypeToken<List<App>>() {}.getType());
    
    for (App app : appList) {
        Log.d("MainActivity", "id is " + app.getId());
        Log.d("MainActivity", "name is " + app.getName());
        Log.d("MainActivity", "version is " + app.getVersion());
    }
}
```
## Best Practice

```java
public interface HttpCallbackListener {
void onFinish(String response);
void onError(Exception e);
}
```

```java
public class HttpUtil {
    public static void sendHttpRequest(final String address, final HttpCallbackListener listener) {
        new Thread(new Runnable() {
        @Override
        public void run() {
            HttpURLConnection connection = null;
            try {
                
            URL url = new URL(address);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(8000);
            connection.setReadTimeout(8000);
            connection.setDoInput(true);
            connection.setDoOutput(true);
            
            InputStream in = connection.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder response = new StringBuilder();
            String line;
            
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            
            if (listener != null) {
                // 回调onFinish()方法
                // 将respone传入回调方法
                listener.onFinish(response.toString());
                }
            } catch (Exception e) {
                if (listener != null) {
                // 回调onError()方法
                listener.onError(e);
                }
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        }  //  end of run
        }).start();  //  end of runnable
    }  //   end of sendHttpRequest
}  //  end of class
```

```java
//以后每当需要发起一条 HTTP 请求的时候就可以这样写:
String address = "http://www.github.com";
String response = HttpUtil.sendHttpRequest(address, new HttpCallbackListener() {
    @Override
    public void onFinish(String response) {
        // 在这里根据返回内容执行具体的逻辑
    }
    @Override
    public void onError(Exception e) {
        // 在这里对异常情况进行处理
    }
});
```
---

# Map

## Location

```java
public class MainActivity extends Activity {

	public static final int SHOW_LOCATION = 0;

	private TextView positionTextView;

	private LocationManager locationManager;

	private String provider;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		positionTextView = (TextView) findViewById(R.id.position_text_view);
		locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
		// 获取所有可用的位置提供器
		List<String> providerList = locationManager.getProviders(true);
		if (providerList.contains(LocationManager.GPS_PROVIDER)) {
			provider = LocationManager.GPS_PROVIDER;
		} else if (providerList.contains(LocationManager.NETWORK_PROVIDER)) {
			provider = LocationManager.NETWORK_PROVIDER;
		} else {
			// 当没有可用的位置提供器时，弹出Toast提示用户
			Toast.makeText(this, "No location provider to use",
					Toast.LENGTH_SHORT).show();
			return;
		}
		Location location = locationManager.getLastKnownLocation(provider);
		if (location != null) {
			// 显示当前设备的位置信息
			showLocation(location);
		}
		locationManager.requestLocationUpdates(provider, 5000, 1,
				locationListener);
	}

	protected void onDestroy() {
		super.onDestroy();
		if (locationManager != null) {
			// 关闭程序时将监听器移除
			locationManager.removeUpdates(locationListener);
		}
	}

	LocationListener locationListener = new LocationListener() {

		@Override
		public void onStatusChanged(String provider, int status, Bundle extras) {
		}

		@Override
		public void onProviderEnabled(String provider) {
		}

		@Override
		public void onProviderDisabled(String provider) {
		}

		@Override
		public void onLocationChanged(Location location) {
			// 更新当前设备的位置信息
			showLocation(location);
		}
	};

	private void showLocation(final Location location) {
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					// 组装反向地理编码的接口地址
					StringBuilder url = new StringBuilder();
					url.append("http://maps.googleapis.com/maps/api/geocode/json?latlng=");
					url.append(location.getLatitude()).append(",")
							.append(location.getLongitude());
					url.append("&sensor=false");
					HttpClient httpClient = new DefaultHttpClient();
					HttpGet httpGet = new HttpGet(url.toString());
					// 在请求消息头中指定语言，保证服务器会返回中文数据
					httpGet.addHeader("Accept-Language", "zh-CN");
					HttpResponse httpResponse = httpClient.execute(httpGet);
					if (httpResponse.getStatusLine().getStatusCode() == 200) {
						HttpEntity entity = httpResponse.getEntity();
						String response = EntityUtils.toString(entity, "utf-8");
						JSONObject jsonObject = new JSONObject(response);
						// 获取results节点下的位置信息
						JSONArray resultArray = jsonObject.getJSONArray("results");
						if (resultArray.length() > 0) {
							JSONObject subObject = resultArray.getJSONObject(0);
							// 取出格式化后的位置信息
							String address = subObject.getString("formatted_address");
							Message message = new Message();
							message.what = SHOW_LOCATION;
							message.obj = address;
							handler.sendMessage(message);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}

	private Handler handler = new Handler() {

		public void handleMessage(Message msg) {
			switch (msg.what) {
			case SHOW_LOCATION:
				String currentPosition = (String) msg.obj;
				positionTextView.setText(currentPosition);
				break;
			default:
				break;
			}
		}

	};

}

```

---

# Sensor
```java
SensorManager senserManager = (SensorManager)getSystemService(Context.SENSOR_SERVICE);
```

```java
SensorEventListener listener = new SensorEventListener() {
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }
    @Override
    public void onSensorChanged(SensorEvent event) {
    }
};
```

```java
senserManager.registerListener(listener, senser, SensorManager.SENSOR_DELAY_NORMAL);
sensorManager.unregisterListener(listener);
```

## Light Sensor
```java
Sensor sensor = senserManager.getDefaultSensor(Sensor.TYPE_LIGHT);
```
## Accelerometer Sensor
```java
Sensor sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
```
## Orientation Sensor
Sensor sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION);
---

# Best Practice

## Global Context
```html
<application
    android:name="com.example.networktest.MyApplication" >
......
</application>
```
```java
public class MyApplication extends Application {
    private static Context context;
    @Override
    public void onCreate() {
        context = getApplicationContext();
    }
    public static Context getContext() {
        return context;
    }
}
```

## 用Intent传递对象
### Serializable
```java
public class Person implements Serializable
```
### Parcelable
```java
public class Person implements Parcelable {
    private String name;
    private int age;
    
    @Override
    public int describeContents() {
        return 0;
    }
    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(name); // 写出name
        dest.writeInt(age); // 写出age
    }
    
    public static final Parcelable.Creator<Person> CREATOR = new Parcelable.Creator<Person>() {
        @Override
        public Person createFromParcel(Parcel source) {
            Person person = new Person();
            person.name = source.readString(); // 读取name
            person.age = source.readInt(); // 读取age
            return person;
        }
        @Override
        public Person[] newArray(int size) {
            return new Person[size];
        }
    };
}
```

## Custom Logger
```java
public class LogUtil {
    public static final int VERBOSE = 1;
    public static final int DEBUG = 2;
    public static final int INFO = 3;
    public static final int WARN = 4;
    public static final int ERROR = 5;
    public static final int NOTHING = 6;
    //custom key
    public static final int LEVEL = VERBOSE;
    
    public static void v(String tag, String msg) {
        if (LEVEL <= VERBOSE) {
            Log.v(tag, msg);
        }
    }
    public static void d(String tag, String msg) {
        if (LEVEL <= DEBUG) {
            Log.d(tag, msg);
        }
    }
    public static void i(String tag, String msg) {
        if (LEVEL <= INFO) {
            Log.i(tag, msg);
        }
    }
    public static void w(String tag, String msg) {
        if (LEVEL <= WARN) {
            Log.w(tag, msg);
        }
    }
    public static void e(String tag, String msg) {
        if (LEVEL <= ERROR) {
            Log.e(tag, msg);
        }
    }
}
```

---
