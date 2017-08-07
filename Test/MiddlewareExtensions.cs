using Microsoft.AspNetCore.Builder;

namespace Test
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseTestMiddleware(
            this IApplicationBuilder builder)
        {
             return builder.UseMiddleware<TestMiddleWareTest>();
        }
    }

}
