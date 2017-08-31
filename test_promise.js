//getUserId 获取用户id
//getMovieId 获取电影id
//bookMovieForUser(uid,mid) 为用户预订电影票


function getUserId() {
    return new Promise(function(resolve) {
        //异步请求
        http.get(url, function(results) {
            resolve(results.id)
        })
    })
}
getUserId().then(function(id) {
    //一些处理
});

//把普通函数转化成promise
function convertToPromise(fn){
	var args =  [].slice.call(arguments);
	var self = this;
	var p = new Promise(function(resolve,reject){
		function cb(ret){
			resolve(ret);
		}
		args.push(cb);
		fn.apply(self,args);
	});
	return p;
}

var getUserIdPromise = convertToPromise(getUserId);
var getMovieIdPromise = convertToPromise(getMovieId);
var bookMovieForUserPromise = convertToPromise(bookMovieForUser);
Promise.all([getUserIdPromise,getMovieIdPromise])
.then(function(param){
	return bookMovieForUserPromise(param[0],param[1]);
}).then(){
	alert('done');
};