FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /user-service

COPY user-service/*.csproj .
RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /user-service BookStoreService.csproj

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /user-service
COPY --from=build /user-service/ .
ENTRYPOINT ["dotnet", "BookStoreService.dll"]