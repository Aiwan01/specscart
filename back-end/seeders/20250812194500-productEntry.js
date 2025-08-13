import { faker } from "@faker-js/faker";

export default {
  async up(queryInterface, Sequelize) {
    const categories = ["Mobile", "Laptop", "Tablet", "Headphones", "Smartwatch", "Camera"];
    const brands = ["Apple", "Samsung", "Sony", "Dell", "HP", "Asus", "Lenovo", "Canon", "Nikon"];
    const colors = ["Black", "White", "Silver", "Blue", "Red", "Gold"];

    const electronicsImages = {
      Laptop: [
        'https://imgs.search.brave.com/Kfa3UKRDdKT-K0TlnOIHjrmehDUY8Kxo2xhKDA6nwDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmRl/bGwuY29tL2lzL2lt/YWdlL0RlbGxDb250/ZW50L2NvbnRlbnQv/ZGFtL3NzMi9wcm9k/dWN0LWltYWdlcy9w/YWdlL2FsaWVud2Fy/ZS9sYXB0b3BzL2F3/LTE2LWF1cm9yYS1h/YzE2MjUwLWFjMTYy/NTEtZ2FtaW5nLWxh/cHRvcHMtb3Zlcmhl/YWQtMngxLTEucHNk/P2ZtdD1qcGcmd2lk/PTgwMCZoZWk9NDAw',
        'https://imgs.search.brave.com/eUdgUL2sABKbTu8KkCWTkXx9mdS5DOKNoWn8IVuH1AU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/ZHlubWVkaWEtMS5t/aWNyb3NvZnQuY29t/L2lzL2ltYWdlL21p/Y3Jvc29mdGNvcnAv/TVNGVC1MYXB0b3Bz/LTEwNDB4NTg1P3Nj/bD0x',
      ],
      Mobile: [
        'https://imgs.search.brave.com/UvbBjMm1KqshaslbqrpbHkpQkZBz38hrTSuTb8A4xxU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/NC8wMy8xNS81Mi9t/b2JpbGUtcGhvbmUt/MjE5ODc3MF82NDAu/cG5n',
        'https://imgs.search.brave.com/Ny6CkEU7B1HDN11rAnJjoFEyX98StD0__faLHGijjE8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZ2l6Ym90LmNv/bS82MDB4NDAwL3Bo/LWJpZy9pbWdfb2cv/c2Ftc3VuZy1nYWxh/eHktYTM2LTVnLWxh/dW5jaGVkLXdpdGgt/c25hcGRyYWdvbi02/LWdlbi0zLTUwbXAt/Y2FtZXJhLTQ1dy1m/YXN0LWNoYXJnaW5n/MTc0MTAyNDQ0MC5q/cGc',
      ],
      Camera: [
        'https://imgs.search.brave.com/gNh4Gd-m4w6Ks07VdKBXqrZA7B6Sel2RYyuLOPGaAO8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly80Lmlt/Zy1kcHJldmlldy5j/b20vZmlsZXMvcC9D/NjN4MTBTNzg2eDQx/OVQzMDB4MTYwfmZl/YXR1cmVfYmxvY2tz/L2I0OGZhYmVhZmY4/YTQxZTU5NjgxZWQx/ODE1OWU3MjllLmpw/ZWc_dj01NzM4',
        'https://imgs.search.brave.com/dk9mc6-P00wErPhIFhHA6NcLkvuTgvFyr5IhP1waBo4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGhld2lyZWN1dHRl/ci5jb20vd3AtY29u/dGVudC9tZWRpYS8y/MDI1LzAyL0JFU1Qt/UE9JTlQtQU5ELVNI/T09ULUNBTUVSQVMt/MjA0OHB4LTYyNDEu/anBnP2F1dG89d2Vi/cCZxdWFsaXR5PTc1/JndpZHRoPTEwMjQ',
      ],
      Headphones : [
        'https://imgs.search.brave.com/CwqzbGKf5z7YNaRKE7oqLnyuYloC4cLpKMdFubNBa3U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzkv/MTAwLzI0OC9zbWFs/bC93aGl0ZS13aXJl/bGVzcy1ibHVldG9v/dGgtaGVhZHBob25l/cy1vbi1ibGFjay1i/YWNrZ3JvdW5kLXRo/ZS1oaWdobGlnaHQt/b2Ytd2lyZWxlc3Mt/Ymx1ZXRvb3RoLWhl/YWRwaG9uZXMtaXMt/bm8tY29ubmVjdG9y/LXRoZXJlLWlzLW5v/LWNvbm5lY3Rpbmct/Y2FibGUtYmV0d2Vl/bi10aGUtbGVmdC1h/bmQtcmlnaHQtaGVh/ZHBob25lcy1waG90/by5qcGc',
        'https://imgs.search.brave.com/9Y-1_3amxcYqdtJd5ATf-1XbtQOhfkHoh4ymBjH-5zk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Ym93ZXJzd2lsa2lu/cy5jb20vZHcvaW1h/Z2UvdjIvQkdKSF9Q/UkQvb24vZGVtYW5k/d2FyZS5zdGF0aWMv/LS9MaWJyYXJ5LVNp/dGVzLWJvd2Vyc19u/b3J0aGFtZXJpY2Ff/c2hhcmVkL2RlZmF1/bHQvZHc0YmYyNGY1/ZC9DYXRlZ29yeS9I/ZWFkcGhvbmVzL2hl/YWRwaG9uZXNfYmxv/Z19jaG9vc2luZy10/aGUtaWRlYWwtaGVh/ZHBob25lLmpwZz9z/dz03Njg'
      ],
      Smartwatch : [
        'https://imgs.search.brave.com/cvQbxM3vO2GriIfp6SRO6MFeOehwtkh1hheOmUJ_QM0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk0OTY1MC1NTEE4/NTQyMzI3MzA3Nl8w/NjIwMjUtVi53ZWJw',
        'https://imgs.search.brave.com/cykHuHGsvnLHqevHjJp62hDiyC1hQaAN8erX8t-iuTI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFCMWFGSVNveEwu/X0FDLl9TUjE4MCwy/MzAuanBn'
      ],
      Tablet : [
        'https://imgs.search.brave.com/EuX9fG_OhK8aVfSorS9le0e8OPUd29-v8qsiuF2w3YE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIz/ODMyNDM3NS9waG90/by9hLXNhbXN1bmct/dGFiLXM4LXRhYmxl/dC1haGVhZC1vZi10/aGUtc2Ftc3VuZy11/bnBhY2tlZC1ldmVu/dC1pbi1zYW4tZnJh/bmNpc2NvLWNhbGlm/b3JuaWEtdS1zLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1t/aVlEbWdiaHVSRDgz/S0pvcXpuYXFIbEcw/T3ZBMi05VFVqNjA3/ZHYyQkhrPQ',
        'https://imgs.search.brave.com/13oUK_7NOqcI0HG0WuCRBDiLnH_HFtp6dT4K_GciwlQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS53aXJlZC5jb20v/cGhvdG9zLzY4NmM2/Yzg3NTMzODM5MzBh/YTYyMmJhZS80OjMv/d18zMjAsY19saW1p/dC9MZW5vdm8lMjBM/ZWdpb24lMjBUYWIl/MjBHZW4lMjAzJTIw/U09VUkNFJTIwSnVs/aWFuJTIwQ2hva2th/dHR1LnBuZw'
      ]

    };


    const products = [];

    for (let i = 0; i < 1000; i++) {
      const category = faker.helpers.arrayElement(categories);
      const brand = faker.helpers.arrayElement(brands);
      const color = faker.helpers.arrayElement(colors);
      const images = faker.helpers.arrayElements(electronicsImages[category]);

      products.push({
        name: `${brand} ${faker.commerce.productAdjective()} ${category}`,
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 800, max: 3500, dec: 0 })), // your price range
        categories: category?.length ? [category] : [],
        imageUrl: images,
        brand: brand?.length ? [brand] : [],
        color: color?.length ? [color] : [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  },
};
