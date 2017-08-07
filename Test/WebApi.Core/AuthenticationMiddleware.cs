using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Test.WebApi.Core
{
  public class AuthenticationMiddleware 
  {
      private readonly RequestDelegate _next;
      private readonly ILogger _logger;

      public AuthenticationMiddleware(ILoggerFactory logger,RequestDelegate next)
      {
          _next = next;
          _logger = logger.CreateLogger("AuthenticationMiddleware");
      }

      public async Task Invoke(HttpContext context)
      {
        if(context.Request.Headers["Authorization"] == "Abc")
        {
               context.Response.StatusCode = 401; //Unauthorized
                return ; 
        }

         await  this._next(context);
      }

  }
}