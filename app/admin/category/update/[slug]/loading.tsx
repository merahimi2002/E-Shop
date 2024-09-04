const UpdateCategoryLoading = () => {
  return (
    <section>
        <div className="container">
            <div className="flex flex-col gap-4">
                <div className="skeleton w-96 h-10"></div>
                <div className="skeleton w-56 h-10"></div>
                <div className="skeleton w-44 h-24"></div>
                <div className="skeleton w-40 h-12 mt-5"></div>
            </div>
        </div>
    </section>
  )
}

export default UpdateCategoryLoading