using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace usedcars.Models
{

public class Car : EntityBase
{

    public string Brand {
        get; set;
    }
    public string Model {
        get; set;
    }
    public int Year {
        get; set;
    }
    public float Kilometers {
        get; set;
    }
    public float Price {
        get; set;
    }

    public override bool isValid(){
        if (this.Kilometers < 0 || this.Kilometers > 1000000) {
            return false;
        }
        if (this.Price < 1 || this.Price > 10000000) {
            return false;
        }
        if (this.Year < 0 || this.Year > 9000) {
            return false;
        }
        if (this.Model.Length > 50) {
            return false;
        }
        if (this.Brand.Length > 50) {
            return false;
        }
        return true;
    }

}

}
