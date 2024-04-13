let categoriesData = []
chrome.storage.local.get(['config'], result => {
    if (result && result.config) {
        categoriesData = result.config
        generateCategories()
    }
    else {
        fetchCategories = fetch('assets/categories_and_links.json')
        .then(response => response.json())
        .then(jsonData => {
            categoriesData = jsonData
            chrome.storage.local.set({'config': categoriesData}, () => {})
            generateCategories()
        })
    }
})

const generateLinks = (linksData) => {
    const linksContainer = document.createElement("div")
    linksContainer.classList.add("links")

    linksData.forEach(link => {
        const linkElement = document.createElement("a")
        linkElement.textContent = link.text
        linkElement.href = link.url
        linkElement.classList.add("link")
        linksContainer.appendChild(linkElement)
    })

    return linksContainer
}

const generateCategories = () => {
    const gridContainer = document.querySelector(".grid-container")
    categoriesData.forEach(categoryData => {
        const categoryElement = document.createElement("div")
        categoryElement.classList.add("category")

        const categoryNameElement = document.createElement("h2")
        categoryNameElement.textContent = categoryData.category
        categoryElement.appendChild(categoryNameElement)

        const linksContainer = generateLinks(categoryData.links)
        categoryElement.appendChild(linksContainer)

        gridContainer.appendChild(categoryElement)
    })
}

