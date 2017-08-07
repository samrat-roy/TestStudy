using Microsoft.AspNetCore.Http;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Routing;

namespace Test
{
    public class TestMiddleWareTest
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public TestMiddleWareTest(ILoggerFactory logger,RequestDelegate next)
        {
            _next = next;
            _logger = logger.CreateLogger("TodoController");;
        }
        public async Task Invoke(HttpContext context)
        {   
            _logger.LogInformation("URl : " + context.Request.Path.Value.ToString());
            // //
            if(context.Request.Headers["Authorization"] == "Abc")
            {
                context.Response.StatusCode = 401; //Unauthorized
                return ; 
            }
            else
            {
                var routeData = context.GetRouteData();
                await  this._next(context);
            }
            
            
            // var client = new HttpClient();
            // client.DefaultRequestHeaders.Accept.Clear();
            // client.DefaultRequestHeaders.Accept.Add(
            //         new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            // client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            // var stringTask = client.GetStringAsync("https://api.github.com/orgs/dotnet/repos");

            // var msg = await stringTask;
            // _logger.LogInformation("msg : " + msg);
            
        }

    }
    

}
