using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;
using System.Collections;
using Task.Api.Utils;

namespace Task.Api.Security
{
    public class CorsPolicyProvider : ICorsPolicyProvider
    {
        private CorsPolicy policy;
        private const string CORSKey = "CorsAccessDomains";

        public CorsPolicyProvider()
        {
            policy = new CorsPolicy() { AllowAnyMethod = true, AllowAnyHeader=true };
            if(System.Web.Configuration.WebConfigurationManager.AppSettings.AllKeys.Any(x=>x== "CorsAccessDomains"))
            {
                System.Web.Configuration.WebConfigurationManager.AppSettings["CorsAccessDomains"].Split('|').ForEachDo(x =>
                {
                    policy.Origins.Add(x);
                });
            }
            
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            
            return System.Threading.Tasks.Task.FromResult(policy);
        }
    }
}