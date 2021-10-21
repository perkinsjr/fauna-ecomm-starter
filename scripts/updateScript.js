Update(
    Function("create_user"),
    {
      "body": Query(
        Lambda(["data"],
          Create(
            Collection("User"),
            {
              credentials: { password: Select("password", Var("data")) },
              data: {
                email: Select("email", Var("data")),
                role: Select("role", Var("data")),
              },
            }
          )
        )
       )
    }
  )
Update(Function("login_user"){
    body:
  Query(
      Lambda(
        ["input"],
        Select(
          "secret",
          Login(Match(Index("unique_User_email"), Select("email", Var("input"))), {
            password: Select("password", Var("input"))
          })
        )
      )
    )
  })

  Update(Function("add_product"), {
    body:
    Query(
        Lambda(
          ["product_id", "productObj"],
          Let(
            { product: Match(Index("get_product_by_id"), Var("product_id")) },
            If(
              Exists(Var("product")),
              Abort("Product ID exists"),
              Let(
                {
                  newProduct: Create(Collection("Product"), {
                    data: Var("productObj")
                  })
                },
                Var("newProduct")
              )
            )
          )
        )
      )})  
     Update(Function("delete_product"), {
         body:
         Query(
            Lambda(
              "product_id",
              Let(
                { product: Match(Index("get_product_by_id"), Var("product_id")) },
                If(
                  Exists(Var("product")),
                  Delete(Select("ref", Get(Var("product"))),
                  ),
                  Abort("Product doesn't exist")
                )
              )
            )
          )
          })  
