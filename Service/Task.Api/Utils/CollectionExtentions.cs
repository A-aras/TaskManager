using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task.Api.Utils
{
    public static class CollectionExtentions
    {
        public static IEnumerable<T> ForEachDo<T>(this IEnumerable<T> collection, Action<T> action)
        {
            foreach (T item in collection)
            {
                action(item);
            }
            return collection;
        }
    }
}