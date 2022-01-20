let app = new Vue({
  el: "#app",
  data: {
    books: [
      {
        id: 1,
        title: "Design Patterns",
        value: 37.88,
        description: "Elements of Reusable Object-Oriented Software",
      },
      {
        id: 2,
        title: "Clean Code",
        value: 32.56,
        description: "A Handbook of Agile Software Craftsmanship",
      },
      {
        id: 3,
        title: "Refactoring",
        value: 45.42,
        description: "Improving the Design of Existing Code",
      },
      {
        id: 4,
        title: "Service Design Patterns",
        value: 38.65,
        description:
          "Fundamental Design Solutions for SOAP/WSDL and RESTful Web Services",
      },
      {
        id: 5,
        title: "Building Microservices",
        value: 42.34,
        description:
          "Distributed systems have become more fine-grained in the past 10 years",
      },
      {
        id: 6,
        title: "Docker: Up & Running",
        value: 21.62,
        description:
          "Docker is quickly changing the way that organizations are deploying software at scale",
      },
    ],
    paginatedBooks: [],
    mySearch: "",
    orderCol: "",
    orderInverse: 1,
    pagination: {
      maxPage: 4,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      numberList: [],
      perPage: [],
    },
  },
  
  computed: {
    filteredBooks() {
      if (this.mySearch !== "") {
        let regex = `${this.mySearch}`.toLowerCase();
        return this.books.filter(
          (book) =>
            book.title.toLowerCase().match(regex) ||
            book.description.toLowerCase().match(regex)
        );
      } else {
        return this.paginatedBooks;
      }
    },
  },
  
  methods: {
    filterOrderBy(col) {
      this.orderCol = col;
      this.orderInverse = this.orderInverse * -1;

      if (this.orderInverse !== -1) {
        return this.paginatedBooks.sort((a, b) =>
          a[`${col}`] > b[`${col}`] ? 1 : -1
        );
      } else {
        return this.paginatedBooks.sort((a, b) =>
          a[`${col}`] < b[`${col}`] ? 1 : -1
        );
      }
    },
    
    previous(e) {
      e.preventDefault();

      if (this.pagination.currentPage === 1) {
        return false;
      }

      this.pagination.currentPage = this.pagination.currentPage - 1;

      this.paginatedBooks = [];

      let index = this.pagination.currentPage - 1;

      for (const row of this.pagination.perPage[index]) {
        this.paginatedBooks.push(row[0]);
      }
    },
    
    pagePagination(e, pageNumber) {
      e.preventDefault();

      this.pagination.currentPage = pageNumber + 1;

      this.paginatedBooks = [];

      for (const row of this.pagination.perPage[pageNumber]) {
        this.paginatedBooks.push(row[0]);
      }
    },
    
    next(e) {
      e.preventDefault();

      if (this.pagination.currentPage === this.pagination.totalPages) {
        return false;
      }

      this.pagination.currentPage = this.pagination.currentPage + 1;

      this.paginatedBooks = [];

      let index = this.pagination.currentPage - 1;

      for (const row of this.pagination.perPage[index]) {
        this.paginatedBooks.push(row[0]);
      }
    },
  },
  
  mounted() {
    this.pagination.totalItems = this.books.length;
    this.pagination.totalPages = Math.ceil(
      this.books.length / this.pagination.maxPage
    );

    let aux = [];

    for (const book of this.books) {
      aux.push([book]);

      if (aux.length === this.pagination.maxPage) {
        this.pagination.perPage.push(aux);
        aux = [];
      }
    }

    if (aux.length > 0) {
      this.pagination.perPage.push(aux);
    }

    this.paginatedBooks = [];

    for (const row of this.pagination.perPage[0]) {
      this.paginatedBooks.push(row[0]);
    }
  },
});
