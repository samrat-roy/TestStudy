using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using StackExchange.Redis;

namespace Test
{
    public class AuthorizationFilter : ActionFilterAttribute
    {
        private readonly ILogger _logger;

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            if(context.RouteData != null && context.RouteData.Values.Count > 0)
            {
                var result = context.RouteData;
                object controller = string.Empty;
                object action = string.Empty;
                StringValues values;
                result.Values.TryGetValue("controller",out controller);
                result.Values.TryGetValue("action",out action);

                context.HttpContext.Request.Headers.TryGetValue("appkey",out values);

               if(values.Count == 0)
               {
                  GetResponse(context);
               }

               string authKey = string.Concat(controller.ToString(),".",action.ToString()+"."+values.ToString());

               if(authKey == "Values.Get.12345")
               {
                   GetResponse(context);
               } 
            }
        }       

        private ResultExecutingContext GetResponse(ResultExecutingContext context)
        {
              var response = context.HttpContext.Response;
                 response.StatusCode = (int)HttpStatusCode.Unauthorized;
                 
                
                context.Result = new ContentResult()  
                {  
                    Content = "Short circuit filter"  
                };  

                return context;
        }

    }
}