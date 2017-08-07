using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace Test
{
    public class TestActionFilter1 : ActionFilterAttribute
    {
        private readonly ILogger _logger;
        private static MemoryCache _myCache = new MemoryCache(new MemoryCacheOptions()); 

        private IConnectionMultiplexer connection;

        private IDatabase cache;

        public TestActionFilter1(ILoggerFactory logger)
        {           
            _logger = logger.CreateLogger("TestActionFilter");      

            ConfigurationOptions redisConfig = new ConfigurationOptions();  
            redisConfig.KeepAlive = 5;
            redisConfig.SyncTimeout = 1000;
            redisConfig.ConnectTimeout = 1000;
            redisConfig.AbortOnConnectFail = false;
            redisConfig.AllowAdmin = false;
            //redisConfig.DefaultVersion = "3.0.2";
            redisConfig.ConnectRetry = 1;
            redisConfig.ClientName = "SE_RedisClient";   
            redisConfig.EndPoints.Add("DVMTGDRDIS001UK.dev.global.tesco.org", 4001);
            redisConfig.EndPoints.Add("DVMTGDRDIS001UK.dev.global.tesco.org",4004);
            redisConfig.EndPoints.Add("DVMTGDRDIS001UK.dev.global.tesco.org",4005);
            redisConfig.EndPoints.Add("DVMTGDRDIS001UK.dev.global.tesco.org", 4006);
            redisConfig.EndPoints.Add("DVMTGDRDIS001UK.dev.global.tesco.org", 4007);
            redisConfig.EndPoints.Add("DVMTGDVNSH001UK.dev.global.tesco.org",4008);
            redisConfig.EndPoints.Add("DVMTGDVNSH001UK.dev.global.tesco.org",4009);    

             this.connection = ConnectionMultiplexer.Connect(redisConfig);
             this.cache = connection.GetDatabase(0);    
            
        }
        public override void OnResultExecuting(ResultExecutingContext context)
        {
            if(context.RouteData != null && context.RouteData.Values.Count > 0)
            {
                var result = context.RouteData;
                object value = string.Empty;
                result.Values.TryGetValue("controller",out value);
                _logger.LogInformation("controller " + value.ToString());

                //  var response = context.HttpContext.Response;
                //  response.StatusCode = (int)HttpStatusCode.Unauthorized;
                 
                
                // context.Result = new ContentResult()  
                // {  
                //     Content = "Short circuit filter"  
                // };  
            }
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            
            var r = _myCache.Get("key");
            if(r == null)
            {
                _myCache.Set("key","Hello From Cache");
            }
            else
            {
                _logger.LogInformation(r.ToString());
            }

            var redis = this.cache.StringGet("key");
            if(string.IsNullOrEmpty(redis))
            {
                this.cache.StringSet("key","Hello From Redis Cache");
            }
            else
            {
                _logger.LogInformation(redis.ToString());
            }
           
        }
        
        public override void OnActionExecuted(ActionExecutedContext context){
            _logger.LogInformation("I am in OnActionExecuted");
        }
    }
}