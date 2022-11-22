import { CategoryAPI } from "../../Api/User/CategoryApi";
import { CategoryDto } from "../../Api/Pic/PicDtos/category.dto";
import { MultiFuncs } from "./MultipleFuncs";

export class Dndfuncs {
  public static DragStarted(
    e: any,
    category: CategoryDto,
    categoryIndex: number
  ) {
    e.dataTransfer.setData("category", JSON.stringify(category));
    e.dataTransfer.setData("categoryIndex", categoryIndex);
  }

  public static OnCategoryDragOver(e: any) {
    e.preventDefault();
  }

  public static async OnCaregoryDrop(e: any,setFavoriteCategories: any,favoriteCategories: any,defaultSearchCategories: any,setCategoryAlertStatus: any,categoryAlertDivId: any) {
    const category = JSON.parse(
      await e.dataTransfer.getData("category")
    ) as CategoryDto;
    await CategoryAPI.AddFavoriteCategory(category._id).then((resp) => {
      if (resp.success) {
        setFavoriteCategories([...favoriteCategories, category]);
        defaultSearchCategories.splice(
          e.dataTransfer.getData("categoryIndex"),
          1
        );
        return;
      }
      setCategoryAlertStatus(resp);
      return MultiFuncs.AlertTimer(categoryAlertDivId, true);
    });
  }
}
