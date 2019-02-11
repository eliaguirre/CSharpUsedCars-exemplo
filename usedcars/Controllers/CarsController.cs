using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JsonFlatFileDataStore;
using usedcars.Models;

namespace usedcars.Controllers
{
[Route("api/[controller]")]
public class CarsController : Controller
{

    private IRepository<Car> respository;


    public CarsController(IRepository<Car> respository){
        this.respository=respository;
    }

    [HttpGet("[action]")]
    public Result<IEnumerable<Car> > Index()
    {

        var result=new Result<IEnumerable<Car> >();
        var ok=respository.GetAll();
        result.success=true;
        result.data=ok;
        return result;
    }


    [HttpGet("{id}")]
    public Result<Car> Get(long id)
    {
        var result=new Result<Car>();
        var car=respository.GetById(id);
        if(car!=null) {
            result.success=true;
            result.data=car;
        }
        return result;
    }

    [HttpPost("[action]")]
    public Result<string> Create( [FromBody] Car car)
    {
        var result=new Result<string>();
        if(car.isValid()) {
            var ok=respository.Create(car);
            if(ok) {
                result.success=true;
                result.data="car created successful";
            }
        }
        return result;
    }

    [HttpPost("[action]")]
    public Result<string> Delete([FromBody] Car id)
    {
        var result=new Result<string>();
        var ok=respository.Delete(id);
        if(ok) {
            result.success=true;
            result.data="car deleted successful "+id.Id;
        }
        return result;
    }

    [HttpPut("{id}")]
    public Result<string> Edit(long id,[FromBody] Car car)
    {
        var result=new Result<string>();
        if(car.isValid()) {
            car.Id=id;
            var ok=respository.Update(car);
            if(ok) {
                result.success=true;
                result.data="car edited successful "+car.Id;
            }
        }
        return result;
    }

}
}
