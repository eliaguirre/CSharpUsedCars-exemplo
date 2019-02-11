


namespace usedcars.Models {

public abstract class EntityBase {
    public long Id {
        get; set;
    }

    public abstract bool isValid();

}
}
