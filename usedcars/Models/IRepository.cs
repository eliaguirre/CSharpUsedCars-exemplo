
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace usedcars.Models {



public interface IRepository<T> where T : EntityBase

{

    IEnumerable<T> GetAll();

    T GetById(Int64 id);

    bool Create(T entity);

    bool Delete(T entity);

    bool Update(T entity);

}


}
