#include <stdio.h>

extern "C" {
  void looper(int n) {
    for (int i = 0; i < n; i++) {
      printf("%d\n", i);
    }
  }
}
