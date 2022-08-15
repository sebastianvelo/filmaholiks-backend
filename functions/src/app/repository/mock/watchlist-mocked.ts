import WatchlistEntity from "../entity/watch-list/WatchlistEntity";

export const showWatchlistMock: {
  userName: string,
  watchlist: WatchlistEntity,
}[] = [
    {
      userName: "sebastianvelo",
      watchlist: {
        lists: [
          {
            "title": "Plan to watch",
            "items": ["1429", "60573", "61222", "73021", "1398", "93405", "60574", "67744", "63926", "3796", "52", "605", "94605"]
          },
          {
            "title": "On hold",
            "items": ["1400", "42009", "81356", "4589", "1668", "456", "1421", "2710", "60625", "152483"]
          },
          {
            "title": "Currently watching",
            "items": ["70796", "97727"]
          },
          {
            "title": "Waiting more episodes",
            "items": ["95557", "76479", "60059"]
          },
          {
            "title": "Completed",
            "items": ["18347", "2316", "1100", "66573", "67070", "186", "1418", "48891", "1396", "1399", "1104", "87739", "67166", "332", "13916", "62560"]
          },
          {
            "title": "Dropped",
            "items": ["1425", "900", "79311"]
          }
        ]
      }
    },
    {
      userName: "HeathBurns",
      watchlist: {
        lists: [
          {
            "title": "Plan to watch",
            "items": ["67744", "63926", "3796", "52", "605", "94605"]
          },
          {
            "title": "On hold",
            "items": ["1400", "152483"]
          },
          {
            "title": "Completed",
            "items": ["18347", "2316", "1100", "66573", "67070", "186", "1418", "48891", "1396", "1399", "1104", "87739", "67166", "332", "13916", "62560"]
          }
        ]
      }
    },
  ];

export const movieWatchlistMock: {
  userName: string,
  watchlist: WatchlistEntity,
}[] = [
    {
      userName: "sebastianvelo",
      watchlist: {
        lists: [
          {
            "title": "Plan to watch",
            "items": ["1429", "60573", "61222", "73021", "1398", "93405", "60574", "67744", "63926", "3796", "52", "605", "94605"]
          },
          {
            "title": "On hold",
            "items": ["1400", "42009", "81356", "4589", "1668", "456", "1421", "2710", "60625", "152483"]
          },
          {
            "title": "Currently watching",
            "items": ["70796", "97727"]
          },
          {
            "title": "Waiting more episodes",
            "items": ["95557", "76479", "60059"]
          },
          {
            "title": "Completed",
            "items": ["18347", "2316", "1100", "66573", "67070", "186", "1418", "48891", "1396", "1399", "1104", "87739", "67166", "332", "13916", "62560"]
          },
          {
            "title": "Dropped",
            "items": ["1425", "900", "79311"]
          }
        ]
      }
    },
    {
      userName: "HeathBurns",
      watchlist: {
        lists: [
          {
            "title": "Plan to watch",
            "items": ["67744", "63926", "3796", "52", "605", "94605"]
          },
          {
            "title": "On hold",
            "items": ["1400", "152483"]
          },
          {
            "title": "Completed",
            "items": ["18347", "2316", "1100", "66573", "67070", "186", "1418", "48891", "1396", "1399", "1104", "87739", "67166", "332", "13916", "62560"]
          }
        ]
      }
    },
  ];