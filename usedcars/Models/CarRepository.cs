using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JsonFlatFileDataStore;
using usedcars.Models;

namespace usedcars {


public class CarRepository : IRepository<Car> {

    private DataStore store;

    public CarRepository(){
        this.store = new DataStore("data.json", keyProperty: "Id");
    }

    public Car GetById(long id){
        var collection = this.store.GetCollection<Car>();
        return collection.AsQueryable().FirstOrDefault(e => e.Id == id);
    }


    public IEnumerable<Car> GetAll(){
        var collection = this.store.GetCollection<Car>();
        return collection.AsQueryable();
    }

    public bool Create(Car car){
        var collection = this.store.GetCollection<Car>();
        car.Id=collection.GetNextIdValue();
        return collection.InsertOne(car);
    }

    public bool Delete(Car car){
        var collection = this.store.GetCollection<Car>();
        return collection.DeleteOne(e => e.Id == car.Id);
    }

    public bool Update(Car car){
        var collection = this.store.GetCollection<Car>();
        return collection.UpdateOne(e => e.Id == car.Id, car as object);
    }

}
}
