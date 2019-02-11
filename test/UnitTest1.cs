using NUnit.Framework;
using System;
using usedcars.Models;
using usedcars.Controllers;
using usedcars;
namespace Tests
{
[TestFixture]
public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void CheckiInValidCar()
    {
        var car=new Car();
        car.Price=-200;
        car.Year=-1;
        car.Brand="sdasdasdasdasdasd";
        car.Model="sdasdasdasdasdasd";
        if(!car.isValid()) {
            Assert.Pass();
            return;
        }
        Assert.Fail();
    }

    [Test]
    public void CheckiValidCar()
    {
        var car=new Car();
        car.Price=99;
        car.Year=2010;
        car.Brand="uno";
        car.Model="fiat";
        if(car.isValid()) {
            Assert.Pass();
            return;
        }
        Assert.Fail();
    }


    [Test]
    public void CheckGet()
    {
        var respository=new CarRepository();
        var carsController=new CarsController(respository);
        var car=carsController.Get(1);
        Assert.AreNotEqual(car.success, true);
    }

    [Test]
    public void CheckUpdate()
    {
        var respository=new CarRepository();
        var carsController=new CarsController(respository);
        var res=carsController.Get(1);
        if(res.success) {
            Random rnd = new Random();
            var newBrand="Diferente"+rnd.Next(52);
            res.data.Brand=newBrand;
            carsController.Edit(1,res.data);
            var res2=carsController.Get(1);
            Assert.AreEqual(res2.data.Brand, newBrand);
        }
    }


    [Test]
    public void CheckDelete()
    {
        var respository=new CarRepository();
        var carsController=new CarsController(respository);
        var car =new Car();
        car.Id=1;
        carsController.Delete(car);
        var res2=carsController.Get(1);
        Assert.AreEqual(res2.success, false);
    }

}
}
