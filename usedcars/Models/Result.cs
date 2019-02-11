using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace usedcars.Models
{

public class Result<T>
{

    public Result(){
        success=false;
    }

    public bool success {
        get; set;
    }

    public int code {
        get; set;
    }


    public T data {
        get; set;
    }

}

}
