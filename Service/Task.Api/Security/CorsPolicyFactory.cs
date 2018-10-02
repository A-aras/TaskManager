using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Cors;

namespace Task.Api.Security
{
    public class CorsPolicyFactory : ICorsPolicyProviderFactory
    {
        private CorsPolicyProvider policyProvider;

        public CorsPolicyFactory()
        {
            policyProvider = new CorsPolicyProvider();
        }

        public ICorsPolicyProvider GetCorsPolicyProvider(HttpRequestMessage request)
        {
            return policyProvider;
        }
    }
}