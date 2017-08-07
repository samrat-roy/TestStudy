using Microsoft.AspNetCore.Builder;

namespace Test.WebApi.Core
{
    public static class AuthenticationMiddlewareExtention
    {
       public static IApplicationBuilder UseAuthentication(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthenticationMiddleware>();
        }
    }
   

}
